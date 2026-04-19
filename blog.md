---
layout: default
title: "Blog"
permalink: /blog/
---

<div class="blog">
    <header class="blog-header">
        <h1>📝 Blog</h1>
        <p>Technical deep dives, lessons learned, and project retrospectives</p>
    </header>
    
    <div class="posts-list">
        {% for post in site.posts %}
        <article class="post-item">
            <h2 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </h2>
            <div class="post-meta">
                {{ post.date | date: "%B %d, %Y" }}
                {% if post.categories %}
                • {% for category in post.categories %}{{ category }}{% unless forloop.last %}, {% endunless %}{% endfor %}
                {% endif %}
            </div>
            <div class="post-excerpt">
                {{ post.excerpt | strip_html | truncatewords: 50 }}
            </div>
            <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
        </article>
        {% endfor %}
    </div>
</div>