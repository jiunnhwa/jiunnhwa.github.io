---
layout: default
title: "Blog"
permalink: /blog/
paginate: true
---

<div class="blog">
    <header class="blog-header">
        <h1>📝 Blog</h1>
        <p>Technical deep dives, lessons learned, and project retrospectives</p>
    </header>
    
    <div class="posts-list">
        <!-- This loops through only the posts for the current page -->
        {% for post in paginator.posts %}
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

        <!-- Pagination links -->
        {% if paginator.total_pages > 1 %}
        <div class="pagination">
          
          {% if paginator.previous_page %}
            <a href="{{ paginator.previous_page_path }}" class="previous">Previous</a>
          {% else %}
            <span class="disabled">Previous</span>
          {% endif %}
        
          <span class="page_number ">
            Page: {{ paginator.page }} of {{ paginator.total_pages }}
          </span>
        
          {% if paginator.next_page %}
            <a href="{{ paginator.next_page_path }}" class="next">Next</a>
          {% else %}
            <span class="disabled">Next</span>
          {% endif %}
          
        </div>
        {% endif %}


    </div>
</div>
