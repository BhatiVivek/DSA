# Web Crawler Design

## Table of Contents
1. [Introduction](#introduction)
2. [What is a Web Crawler?](#what-is-a-web-crawler)
3. [Key Components](#key-components)
4. [System Architecture](#system-architecture)
5. [Design Considerations](#design-considerations)
6. [Challenges](#challenges)
7. [Implementation Approach](#implementation-approach)
8. [Optimization Strategies](#optimization-strategies)
9. [Real-World Examples](#real-world-examples)

---

## Introduction

A web crawler (also known as a spider or bot) is a program that systematically browses the World Wide Web, typically for the purpose of web indexing. Search engines like Google, Bing, and others use web crawlers to discover and index web pages.

## What is a Web Crawler?

A web crawler is an automated program that:
- Starts from a set of seed URLs
- Downloads web pages
- Extracts links from those pages
- Follows those links to discover new pages
- Continues this process recursively

### Use Cases:
- **Search Engines**: Index web pages for search results
- **Data Mining**: Collect data for analysis
- **Monitoring**: Track website changes
- **SEO Analysis**: Analyze website structure and links
- **Price Comparison**: Aggregate product data from e-commerce sites

---

## Key Components

### 1. URL Frontier (URL Queue)
- **Purpose**: Stores URLs to be crawled
- **Implementation**: Priority queue or distributed queue system
- **Features**:
  - Prioritization of important URLs
  - Deduplication to avoid crawling same URL multiple times
  - Politeness policy enforcement

### 2. HTML Fetcher
- **Purpose**: Downloads web pages from the internet
- **Responsibilities**:
  - HTTP/HTTPS requests
  - Handle redirects
  - Manage timeouts
  - Respect robots.txt

### 3. DNS Resolver
- **Purpose**: Converts domain names to IP addresses
- **Optimization**: Cache DNS results to reduce lookup time

### 4. Content Parser
- **Purpose**: Extracts useful information from downloaded pages
- **Extracts**:
  - Links (URLs)
  - Text content
  - Metadata
  - Images and other resources

### 5. Link Extractor
- **Purpose**: Identifies and normalizes URLs from parsed content
- **Functions**:
  - Convert relative URLs to absolute URLs
  - Filter out invalid URLs
  - Apply URL normalization

### 6. URL Filter
- **Purpose**: Decides which URLs should be crawled
- **Filters based on**:
  - Domain restrictions
  - File types
  - URL patterns
  - Blacklists/whitelists

### 7. URL Seen Database
- **Purpose**: Tracks already visited URLs to avoid duplication
- **Implementation**: Bloom filter or distributed hash table
- **Benefits**: Saves bandwidth and processing time

### 8. Content Storage
- **Purpose**: Stores downloaded web pages and extracted data
- **Options**:
  - File system
  - Distributed storage (like HDFS, S3)
  - Database

---

## System Architecture

```
                              ┌─────────────────┐
                              │   Seed URLs     │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                         ┌────┤  URL Frontier   │◄────┐
                         │    └────────┬────────┘     │
                         │             │              │
                         │             ▼              │
                         │    ┌─────────────────┐    │
                         │    │  URL Filter &   │    │
                         │    │  Deduplicator   │    │
                         │    └────────┬────────┘    │
                         │             │              │
                         │             ▼              │
                         │    ┌─────────────────┐    │
                         │    │  DNS Resolver   │    │
                         │    └────────┬────────┘    │
                         │             │              │
                         │             ▼              │
                         │    ┌─────────────────┐    │
                         │    │  HTML Fetcher   │    │
                         │    └────────┬────────┘    │
                         │             │              │
                         │             ▼              │
                         │    ┌─────────────────┐    │
                         │    │ Content Parser  │    │
                         │    └────────┬────────┘    │
                         │             │              │
                         │             ▼              │
                         │    ┌─────────────────┐    │
                         │    │ Link Extractor  │────┘
                         │    └────────┬────────┘
                         │             │
                         │             ▼
                         │    ┌─────────────────┐
                         └───►│ Content Storage │
                              └─────────────────┘
```

---

## Design Considerations

### 1. Scalability
- **Challenge**: Web has billions of pages
- **Solution**:
  - Distributed crawling
  - Horizontal scaling
  - Partition URLs across multiple machines

### 2. Politeness
- **Challenge**: Don't overload target servers
- **Solution**:
  - Delay between requests to same domain
  - Respect robots.txt
  - Implement rate limiting per domain

### 3. Robustness
- **Challenge**: Handle failures and malicious pages
- **Solution**:
  - Exception handling
  - Timeout mechanisms
  - Validate content before parsing

### 4. Extensibility
- **Challenge**: Support different protocols and formats
- **Solution**:
  - Modular design
  - Plugin architecture
  - Support for various content types

### 5. Performance
- **Challenge**: Process millions of pages efficiently
- **Solution**:
  - Parallel processing
  - Caching (DNS, robots.txt)
  - Efficient data structures

---

## Challenges

### 1. Duplicate Content Detection
**Problem**: Same content may exist at multiple URLs

**Solutions**:
- Use content fingerprinting (hash of page content)
- Maintain a bloom filter for quick duplicate detection
- Canonical URL detection

### 2. Crawl Trap Detection
**Problem**: Infinite loops (dynamic URLs with infinite variations)

**Solutions**:
- Limit crawl depth
- Detect URL patterns
- Set maximum pages per domain

### 3. robots.txt Compliance
**Problem**: Must respect website crawling policies

**Solution**:
- Parse robots.txt before crawling domain
- Cache robots.txt files
- Implement crawl-delay directives

### 4. Dynamic Content (JavaScript-rendered)
**Problem**: Modern websites use JavaScript to load content

**Solutions**:
- Use headless browsers (Puppeteer, Selenium)
- Wait for page to fully load
- Execute JavaScript before parsing

### 5. Prioritization
**Problem**: Not all pages have equal importance

**Solutions**:
- PageRank-based prioritization
- Fresh content prioritization
- User-defined importance metrics

### 6. Handling Different Content Types
**Problem**: Web has HTML, images, PDFs, videos, etc.

**Solutions**:
- Content-type detection
- Specialized parsers for each type
- Storage strategy per content type

---

## Implementation Approach

### Step 1: Initialize
```javascript
// Pseudocode
class WebCrawler {
    constructor(seedUrls, maxDepth, maxPages) {
        this.urlFrontier = new PriorityQueue();
        this.visitedUrls = new Set();
        this.maxDepth = maxDepth;
        this.maxPages = maxPages;
        this.pagesCrawled = 0;
        
        // Add seed URLs
        seedUrls.forEach(url => {
            this.urlFrontier.enqueue(url, 0); // priority 0 for seeds
        });
    }
}
```

### Step 2: Main Crawl Loop
```javascript
async crawl() {
    while (!this.urlFrontier.isEmpty() && this.pagesCrawled < this.maxPages) {
        const { url, depth } = this.urlFrontier.dequeue();
        
        // Skip if already visited
        if (this.visitedUrls.has(url)) {
            continue;
        }
        
        // Skip if max depth reached
        if (depth > this.maxDepth) {
            continue;
        }
        
        // Mark as visited
        this.visitedUrls.add(url);
        
        try {
            // Fetch the page
            const page = await this.fetchPage(url);
            
            // Parse content
            const parsedData = this.parseContent(page);
            
            // Store content
            await this.storeContent(url, parsedData);
            
            // Extract and enqueue new URLs
            const newUrls = this.extractUrls(parsedData.content, url);
            newUrls.forEach(newUrl => {
                if (!this.visitedUrls.has(newUrl)) {
                    this.urlFrontier.enqueue(newUrl, depth + 1);
                }
            });
            
            this.pagesCrawled++;
            
            // Politeness: wait before next request
            await this.sleep(this.crawlDelay);
            
        } catch (error) {
            console.error(`Error crawling ${url}:`, error);
        }
    }
}
```

### Step 3: Fetch Page
```javascript
async fetchPage(url) {
    // Check robots.txt
    const robotsAllowed = await this.checkRobots(url);
    if (!robotsAllowed) {
        throw new Error('Blocked by robots.txt');
    }
    
    // DNS resolution (with caching)
    const ip = await this.resolveDNS(url);
    
    // HTTP request
    const response = await fetch(url, {
        timeout: 10000,
        headers: {
            'User-Agent': 'MyWebCrawler/1.0'
        }
    });
    
    return {
        content: await response.text(),
        headers: response.headers,
        statusCode: response.status
    };
}
```

### Step 4: Parse Content
```javascript
parseContent(page) {
    // Use HTML parser (like Cheerio for Node.js)
    const $ = loadHTML(page.content);
    
    return {
        title: $('title').text(),
        content: page.content,
        links: $('a[href]').map((i, el) => $(el).attr('href')).get(),
        metadata: {
            description: $('meta[name="description"]').attr('content'),
            keywords: $('meta[name="keywords"]').attr('content')
        }
    };
}
```

### Step 5: URL Normalization
```javascript
normalizeUrl(url, baseUrl) {
    // Convert relative to absolute
    const absoluteUrl = new URL(url, baseUrl);
    
    // Remove fragments
    absoluteUrl.hash = '';
    
    // Sort query parameters
    absoluteUrl.searchParams.sort();
    
    // Convert to lowercase
    return absoluteUrl.toString().toLowerCase();
}
```

---

## Optimization Strategies

### 1. Multi-threading/Multi-processing
- Use worker threads or processes
- Crawl multiple URLs in parallel
- Balance load across workers

### 2. Distributed Crawling
- **Partition by Domain**: Each crawler handles specific domains
- **Partition by URL Hash**: Distribute URLs based on hash value
- **Centralized URL Frontier**: Use message queue (RabbitMQ, Kafka)

### 3. Caching
- **DNS Cache**: Reduce DNS lookup time
- **Robots.txt Cache**: Avoid repeated fetches
- **Content Cache**: Store frequently accessed pages

### 4. Bloom Filters for Deduplication
- Space-efficient probabilistic data structure
- Quick check for URL existence
- Trade-off: small false positive rate

### 5. URL Prioritization
- **PageRank-based**: Crawl important pages first
- **Freshness-based**: Recrawl frequently updated pages
- **Business-logic based**: Custom prioritization rules

### 6. Efficient Storage
- **Compression**: Compress stored content
- **Distributed Storage**: Use HDFS, S3, or similar
- **Indexing**: Create indices for fast retrieval

---

## Real-World Examples

### 1. Google's Web Crawler (Googlebot)
- **Scale**: Crawls trillions of pages
- **Features**:
  - Distributed architecture
  - Intelligent recrawl scheduling
  - JavaScript rendering support
  - Mobile-first indexing

### 2. Internet Archive's Heritrix
- **Purpose**: Archive web content
- **Features**:
  - Open-source
  - Highly configurable
  - Designed for archival (not search)

### 3. Common Crawl
- **Purpose**: Open repository of web crawl data
- **Features**:
  - Crawls billions of pages monthly
  - Makes data freely available
  - Used for research and analysis

### 4. Scrapy (Python Framework)
- **Purpose**: Web scraping and crawling framework
- **Features**:
  - Built-in support for following links
  - Item pipelines for data processing
  - Middleware for extensibility

---

## Key Takeaways

1. **Start Simple**: Begin with basic BFS/DFS crawler
2. **Add Features Incrementally**: URL deduplication, politeness, etc.
3. **Design for Scale**: Plan for distributed architecture
4. **Respect the Web**: Follow robots.txt and be polite
5. **Handle Failures**: Network issues, malformed pages, etc.
6. **Optimize Smartly**: Cache, parallelize, and prioritize

---

## Further Reading

- **Books**:
  - "Web Crawling" by Christopher Olston and Marc Najork
  - "Mining the Web: Discovering Knowledge from Hypertext Data" by Soumen Chakrabarti

- **Papers**:
  - "The Anatomy of a Large-Scale Hypertextual Web Search Engine" (Google)
  - "Mercator: A Scalable, Extensible Web Crawler"

- **Resources**:
  - robots.txt specification: https://www.robotstxt.org/
  - sitemap.xml protocol: https://www.sitemaps.org/

---

## Practice Questions

1. How would you handle a website that serves different content based on cookies or login state?
2. Design a focused crawler that only crawls pages about a specific topic.
3. How would you detect and handle spider traps?
4. Design a system to keep the crawled data fresh by recrawling pages periodically.
5. How would you implement a distributed web crawler using message queues?

---

**Happy Learning! 🚀**
