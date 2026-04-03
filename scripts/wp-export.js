const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const TurndownService = require('turndown');

// ─── Config ───────────────────────────────────────────────────────────────────
const XML_PATH = path.join(__dirname, 'seoquotquot.WordPress.2026-04-03.xml');
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const IMAGE_MAP_PATH = path.join(__dirname, 'image-map.json');

// Post types to skip entirely
const SKIP_TYPES = new Set([
  'attachment', 'et_template', 'et_pb_layout', 'et_body_layout',
  'et_header_layout', 'et_footer_layout', 'nav_menu_item',
  'wp_global_styles', 'wp_navigation', 'sa_slider', 'custom_css',
  'wp_template', 'wp_template_part', 'wp_font_family', 'wp_font_face',
  'oembed_cache', 'customize_changeset',
]);

// Slug → target directory mapping for pages
const SERVICE_SLUGS = new Set([
  'seo-audit', 'seo-prodvizhenie', 'kontent-plan',
  'sozdanie-seo-dashbordov', 'migracziya-sajta', 'semanticheskoe-yadro',
]);

const COURSE_SLUGS = new Set([
  'ai-main', 'ai-module-1', 'ai-module-2', 'ai-module-3',
  'ai-module-4', 'ai-module-5', 'ai-module-6', 'ai-module-7',
  'onlajn-kurs-po-nejrosetyam',
]);

const PAGE_SLUG_MAP = {
  'home': 'home',
  'o-nas': 'about',
  'kontakty': 'contact',
};

// Service display order
const SERVICE_ORDER = {
  'seo-audit': 1,
  'seo-prodvizhenie': 2,
  'kontent-plan': 3,
  'sozdanie-seo-dashbordov': 4,
  'migracziya-sajta': 5,
  'semanticheskoe-yadro': 6,
};

const SERVICE_ICONS = {
  'seo-audit': 'search',
  'seo-prodvizhenie': 'trending-up',
  'kontent-plan': 'file-text',
  'sozdanie-seo-dashbordov': 'bar-chart',
  'migracziya-sajta': 'refresh-cw',
  'semanticheskoe-yadro': 'database',
};

// ─── HTML entity decoding ─────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// ─── Turndown setup ───────────────────────────────────────────────────────────
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

// Keep blockquotes clean
turndown.addRule('blockquote', {
  filter: 'blockquote',
  replacement: (content) => {
    const lines = content.trim().split('\n');
    return '\n\n' + lines.map(l => `> ${l}`).join('\n') + '\n\n';
  },
});

// ─── Divi shortcode stripping ─────────────────────────────────────────────────

/**
 * Strip Divi shortcodes, extracting only the inner content of [et_pb_text] blocks.
 * Other et_pb_* wrappers are removed entirely (they're layout containers).
 */
function stripDiviShortcodes(content) {
  if (!content) return '';

  // Remove WordPress block markers: <!-- wp:* --> and <!-- /wp:* -->
  // Also remove <!-- divi:* --> markers
  content = content.replace(/<!--\s*\/?\s*(?:wp|divi):[^>]*-->/g, '');

  // Extract content from et_pb_text blocks
  // Pattern: [et_pb_text ...attrs...]<actual HTML>[/et_pb_text]
  // We need to handle nested shortcodes, so we process iteratively

  // First, extract all et_pb_text inner content
  const textBlocks = [];
  const textRegex = /\[et_pb_text[^\]]*\]([\s\S]*?)\[\/et_pb_text\]/g;
  let match;
  while ((match = textRegex.exec(content)) !== null) {
    textBlocks.push(match[1].trim());
  }

  // If we found text blocks, use only their content
  if (textBlocks.length > 0) {
    return textBlocks.join('\n\n');
  }

  // If no et_pb_text found, strip all remaining shortcodes and return raw content
  // This handles content that doesn't use the Divi builder
  content = content.replace(/\[et_pb_[^\]]*\]/g, '');
  content = content.replace(/\[\/et_pb_[^\]]*\]/g, '');

  return content.trim();
}

/**
 * Clean up HTML before turndown conversion
 */
function cleanHtml(html) {
  if (!html) return '';

  // Remove &nbsp; sequences (often used as spacing in WP)
  html = html.replace(/(<p>\s*&nbsp;\s*<\/p>\s*)+/g, '');
  html = html.replace(/&nbsp;/g, ' ');

  // Remove empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  // Remove WP block classes from elements but keep the elements
  html = html.replace(/\s+class="[^"]*wp-block[^"]*"/g, '');
  html = html.replace(/\s+class="[^"]*has-alpha[^"]*"/g, '');

  // Remove id attributes with URL-encoded values
  html = html.replace(/\s+id="[%\w-]+"/g, '');

  return html.trim();
}

/**
 * Collect all image URLs from content
 */
function collectImageUrls(content) {
  const urls = new Set();
  if (!content) return urls;

  // Match src attributes in img tags
  const imgRegex = /(?:src|href)=["']([^"']*?\.(?:jpg|jpeg|png|gif|webp|svg))[^"']*["']/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }

  // Match image URLs in shortcode attributes (e.g., src="https://tu.by/...")
  const shortcodeImgRegex = /(?:src|image|background_image)="([^"]*?\.(?:jpg|jpeg|png|gif|webp|svg))[^"]*"/gi;
  while ((match = shortcodeImgRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }

  return urls;
}

// ─── XML helpers ──────────────────────────────────────────────────────────────

function getCdata(field) {
  if (!field) return '';
  if (Array.isArray(field)) field = field[0];
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && field._) return field._;
  return String(field || '');
}

function getField(item, ns, name) {
  const key = `${ns}:${name}`;
  const val = item[key];
  if (!val) return '';
  return getCdata(val);
}

// ─── Author map ───────────────────────────────────────────────────────────────

function buildAuthorMap(channel) {
  const map = {};
  const authors = channel['wp:author'] || [];
  for (const a of authors) {
    const login = getCdata(a['wp:author_login']);
    const displayName = getCdata(a['wp:author_display_name']);
    map[login] = displayName || login;
  }
  return map;
}

// ─── Content conversion ──────────────────────────────────────────────────────

function convertToMarkdown(rawContent) {
  // Step 1: Strip Divi shortcodes
  let html = stripDiviShortcodes(rawContent);

  // Step 2: Clean HTML
  html = cleanHtml(html);

  if (!html) return '';

  // Step 3: Convert to Markdown
  let md = turndown.turndown(html);

  // Step 4: Clean up markdown
  // Remove excessive blank lines
  md = md.replace(/\n{3,}/g, '\n\n');

  // Trim trailing whitespace on each line
  md = md.split('\n').map(l => l.trimEnd()).join('\n');

  return md.trim();
}

/**
 * Create a clean description from markdown (strip formatting, limit length)
 */
function makeDescription(markdown, maxLen = 160) {
  return markdown
    .replace(/^#+\s+/gm, '')       // strip headings
    .replace(/[*_`~]/g, '')         // strip formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')    // remove images
    .replace(/\\([.!])/g, '$1')     // unescape markdown
    .replace(/\n+/g, ' ')           // newlines → spaces
    .replace(/\s+/g, ' ')           // collapse whitespace
    .trim()
    .substring(0, maxLen);
}

// ─── File writing ─────────────────────────────────────────────────────────────

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeMdxFile(filePath, frontmatter, content) {
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return `${k}: [${v.map(i => `"${i}"`).join(', ')}]`;
      }
      if (typeof v === 'number') return `${k}: ${v}`;
      // Escape backslashes and quotes in string values for YAML
      const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `${k}: "${escaped}"`;
    })
    .join('\n');

  const fileContent = `---\n${fm}\n---\n\n${content}\n`;
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
}

// ─── Main export logic ────────────────────────────────────────────────────────

async function main() {
  console.log('Reading XML file...');
  const xml = fs.readFileSync(XML_PATH, 'utf-8');

  console.log('Parsing XML...');
  const parser = new xml2js.Parser({
    explicitCDATA: false,
    normalizeTags: false,
    explicitArray: true,
  });
  const result = await parser.parseStringPromise(xml);

  const channel = result.rss.channel[0];
  const items = channel.item || [];
  const authorMap = buildAuthorMap(channel);

  console.log(`Found ${items.length} items total`);

  const allImageUrls = new Set();
  const stats = { pages: 0, services: 0, courses: 0, posts: 0, faq: 0, skipped: 0 };
  const faqItems = [];

  for (const item of items) {
    const postType = getField(item, 'wp', 'post_type');
    const status = getField(item, 'wp', 'status');
    const slug = getField(item, 'wp', 'post_name');
    const title = getCdata(item.title?.[0]) || '';
    const rawContent = getField(item, 'content', 'encoded');
    const creator = getCdata(item['dc:creator']?.[0]) || '';
    const pubDate = getField(item, 'wp', 'post_date');

    // Skip non-publish items (except attachments which have 'inherit')
    if (status !== 'publish') {
      stats.skipped++;
      continue;
    }

    // Skip unwanted post types
    if (SKIP_TYPES.has(postType)) {
      stats.skipped++;
      continue;
    }

    // Collect image URLs from raw content
    const imgs = collectImageUrls(rawContent);
    imgs.forEach(url => allImageUrls.add(url));

    // Also collect from shortcode attributes
    const shortcodeImgs = collectImageUrls(
      rawContent.replace(/\[et_pb_[^\]]*\]/g, (m) => m) // keep shortcodes for URL extraction
    );
    shortcodeImgs.forEach(url => allImageUrls.add(url));

    // Convert content
    const markdown = convertToMarkdown(rawContent);

    // Get categories
    const categories = (item.category || [])
      .filter(c => c?.$?.domain === 'category')
      .map(c => getCdata(c));

    const tags = (item.category || [])
      .filter(c => c?.$?.domain === 'post_tag')
      .map(c => getCdata(c));

    const faqCategories = (item.category || [])
      .filter(c => c?.$?.domain === 'dipi_faq_category')
      .map(c => getCdata(c));

    // ── Route items to correct directories ──

    if (postType === 'dipi_faq') {
      // FAQ items → JSON
      faqItems.push({
        question: decodeHtmlEntities(title),
        answer: decodeHtmlEntities(markdown || rawContent.trim()),
        slug: slug,
        category: faqCategories[0]?.toLowerCase().replace('&amp;', '&') || 'qa',
      });
      stats.faq++;
      continue;
    }

    if (postType === 'post') {
      // Blog posts
      const authorName = authorMap[creator] || creator;
      const date = pubDate ? pubDate.split(' ')[0] : '';
      const frontmatter = {
        title: title,
        slug: slug,
        date: date,
        author: authorName,
        category: categories[0] || 'Uncategorized',
        tags: tags.length ? tags : categories,
        excerpt: makeDescription(markdown),
        coverImage: `/images/blog/${slug}/cover.jpg`,
      };
      const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.mdx`);
      writeMdxFile(filePath, frontmatter, markdown);
      stats.posts++;
      continue;
    }

    if (postType === 'page') {
      // Determine where this page goes
      if (SERVICE_SLUGS.has(slug)) {
        // Service pages
        const frontmatter = {
          title: title,
          slug: slug,
          description: makeDescription(markdown),
          order: SERVICE_ORDER[slug] || 99,
          icon: SERVICE_ICONS[slug] || 'file',
        };
        const filePath = path.join(CONTENT_DIR, 'services', `${slug}.mdx`);
        writeMdxFile(filePath, frontmatter, markdown);
        stats.services++;
      } else if (COURSE_SLUGS.has(slug)) {
        // Course pages
        const isModule = slug.startsWith('ai-module-');
        const frontmatter = {
          title: title,
          slug: slug,
          description: makeDescription(markdown),
          order: isModule ? parseInt(slug.replace('ai-module-', ''), 10) : 0,
        };
        const dir = isModule
          ? path.join(CONTENT_DIR, 'courses', 'modules')
          : path.join(CONTENT_DIR, 'courses');
        const filePath = path.join(dir, `${slug}.mdx`);
        writeMdxFile(filePath, frontmatter, markdown);
        stats.courses++;
      } else if (PAGE_SLUG_MAP[slug]) {
        // Static pages (home, about, contact)
        const targetSlug = PAGE_SLUG_MAP[slug];
        const frontmatter = {
          title: title,
          slug: targetSlug,
          description: makeDescription(markdown),
        };
        const filePath = path.join(CONTENT_DIR, 'pages', `${targetSlug}.mdx`);
        writeMdxFile(filePath, frontmatter, markdown);
        stats.pages++;
      } else {
        // Other published pages → pages/ directory
        const frontmatter = {
          title: title,
          slug: slug,
          description: makeDescription(markdown),
        };
        const filePath = path.join(CONTENT_DIR, 'pages', `${slug}.mdx`);
        writeMdxFile(filePath, frontmatter, markdown);
        stats.pages++;
      }
      continue;
    }

    // Other published post types we didn't account for
    console.log(`  ? Skipping unknown type: ${postType} (${slug})`);
    stats.skipped++;
  }

  // ── Write FAQ JSON ──
  if (faqItems.length > 0) {
    const faqDir = path.join(CONTENT_DIR, 'faq');
    ensureDir(faqDir);
    const faqPath = path.join(faqDir, 'faq-items.json');
    fs.writeFileSync(faqPath, JSON.stringify(faqItems, null, 2), 'utf-8');
    console.log(`  ✓ ${path.relative(process.cwd(), faqPath)} (${faqItems.length} items)`);
  }

  // ── Write image map ──
  const imageMap = {
    totalImages: allImageUrls.size,
    urls: [...allImageUrls].sort(),
  };
  fs.writeFileSync(IMAGE_MAP_PATH, JSON.stringify(imageMap, null, 2), 'utf-8');
  console.log(`  ✓ ${path.relative(process.cwd(), IMAGE_MAP_PATH)} (${allImageUrls.size} URLs)`);

  // ── Summary ──
  console.log('\n── Export Summary ──');
  console.log(`  Pages:    ${stats.pages}`);
  console.log(`  Services: ${stats.services}`);
  console.log(`  Courses:  ${stats.courses}`);
  console.log(`  Posts:    ${stats.posts}`);
  console.log(`  FAQ:      ${stats.faq}`);
  console.log(`  Skipped:  ${stats.skipped}`);
  console.log(`  Images:   ${allImageUrls.size}`);
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
