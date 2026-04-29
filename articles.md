---
layout: default
title: "Articles"
permalink: /articles/
---

<div class="articles">
    <header class="articles-header">
        <h1>📝 Articles</h1>
        <p>Thoughts from Philosophy to Python — on constructing systems, and de-constructing systems — published on <a href="https://e27.co/user/jiunn/" target="_blank">e27.co</a></p>
    </header>

    <div class="articles-list" id="articles-list">
        <!-- All articles go here. The first 5 will show, rest hidden -->
        <!-- Add NEW articles at the TOP of this list -->


        <article class="article-item">
            <h2 class="article-title">
                <a href="https://e27.co/from-shell-to-startups-why-scenario-planning-matters-in-a-volatile-times-20260406/" target="_blank">From shell to startups: Why scenario planning matters in volatile times | e27</a>
            </h2>
            <div class="article-meta">📅 6 April 2026 | 📍 e27</div>
            <div class="article-excerpt">
                Scenario planning helps businesses navigate uncertainty by preparing for multiple outcomes, shifting focus from prediction to resilience
            </div>
            <a href="https://e27.co/from-shell-to-startups-why-scenario-planning-matters-in-a-volatile-times-20260406/" class="read-article" target="_blank">Read on e27 →</a>
        </article>


        <article class="article-item">
            <h2 class="article-title">
                <a href="https://e27.co/from-frameworks-to-flow-what-agile-really-teaches-us-about-building-in-uncertainty-20260413/" target="_blank">From frameworks to flow: What Agile really teaches us about building in uncertainty</a>
            </h2>
            <div class="article-meta">📅 April 13, 2026 | 📍 e27</div>
            <div class="article-excerpt">
                Moving beyond rigid rituals to true adaptive planning. A reflection on what Agile actually teaches us about navigating complexity, uncertainty, and continuous delivery.
            </div>
            <a href="https://e27.co/from-frameworks-to-flow-what-agile-really-teaches-us-about-building-in-uncertainty-20260413/" class="read-article" target="_blank">Read on e27 →</a>
        </article>

        <article class="article-item">
            <h2 class="article-title">
                <a href="https://e27.co/from-conflict-to-compute-how-war-oil-and-energy-will-reshape-the-future-of-startups-20260324/" target="_blank">From conflict to compute: How war, oil, and energy will reshape the future of startups | e27</a>
            </h2>
            <div class="article-meta">📅 24 March 2026 | 📍 e27</div>
            <div class="article-excerpt">
                Geopolitical energy shocks raise oil prices, tighten capital, and reshape startup innovation toward efficiency, resilience, and AI energy challenges
            </div>
            <a href="https://e27.co/from-conflict-to-compute-how-war-oil-and-energy-will-reshape-the-future-of-startups-20260324/" class="read-article" target="_blank">Read on e27 →</a>
        </article>

        <article class="article-item">
            <h2 class="article-title">
                <a href="https://e27.co/the-digital-economys-broken-promise-how-tech-restructured-inequality-instead-of-erasing-it-20260322/" target="_blank">The digital economy's broken promise: How tech restructured inequality instead of erasing it</a>
            </h2>
            <div class="article-meta">📅 March 22, 2026 | 📍 e27</div>
            <div class="article-excerpt">
                An examination of how digital platforms, AI, and automation have reshaped economic structures — often reinforcing the divides they promised to close. A critical look at tech's unintended consequences.
            </div>
            <a href="https://e27.co/the-digital-economys-broken-promise-how-tech-restructured-inequality-instead-of-erasing-it-20260322/" class="read-article" target="_blank">Read on e27 →</a>
        </article>

        <!-- 👇 Add new articles ABOVE this line. They will be automatically numbered -->

        <!-- Article 3 -->
        <!-- Article 4 -->
        <!-- Article 5 -->
        <!-- Article 6 -->
        <!-- Article 7 -->
        <!-- Article 8 -->
        <!-- Article 9 -->
        <!-- Article 10 -->

    </div>

    <div class="load-more-container" id="load-more-container">
        <button id="load-more-btn" class="load-more-btn">Load more articles ↓</button>
    </div>

    <div class="articles-footer">
        <hr>
        <p>📚 <a href="https://e27.co/user/jiunn/" target="_blank">View all articles on my e27 profile →</a></p>
    </div>
</div>

<script>
(function() {
    const list = document.getElementById('articles-list');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const items = list ? Array.from(list.querySelectorAll('.article-item')) : [];
    const itemsToShow = 5;
    let currentIndex = itemsToShow;

    function hideAllArticles() {
        items.forEach(item => item.style.display = 'none');
    }

    function showArticlesUpTo(index) {
        for (let i = 0; i < Math.min(index, items.length); i++) {
            items[i].style.display = 'block';
        }
    }

    function updateButton() {
        if (currentIndex >= items.length) {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        } else {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }

    function loadMore() {
        const nextIndex = Math.min(currentIndex + itemsToShow, items.length);
        showArticlesUpTo(nextIndex);
        currentIndex = nextIndex;
        updateButton();
    }

    if (items.length > itemsToShow) {
        hideAllArticles();
        showArticlesUpTo(itemsToShow);
        currentIndex = itemsToShow;
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.addEventListener('click', loadMore);
        }
    } else {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
        items.forEach(item => item.style.display = 'block');
    }
})();
</script>
