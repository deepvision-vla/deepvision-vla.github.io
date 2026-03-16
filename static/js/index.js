window.HELP_IMPROVE_VIDEOJS = false;

function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');

    if (!bibtexElement || !button) {
        return;
    }

    const copyText = button.querySelector('.copy-text');
    const content = bibtexElement.textContent;

    function showCopiedState() {
        button.classList.add('copied');
        if (copyText) {
            copyText.textContent = 'Copied';
        }

        setTimeout(function() {
            button.classList.remove('copied');
            if (copyText) {
                copyText.textContent = 'Copy';
            }
        }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content).then(showCopiedState).catch(function() {
            const textArea = document.createElement('textarea');
            textArea.value = content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopiedState();
        });
        return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopiedState();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setupDemoVideoAutoplay() {
    const videos = document.querySelectorAll('.demo-video');

    if (videos.length === 0) {
        return;
    }

    videos.forEach(function(video) {
        video.muted = true;
    });

    if (!('IntersectionObserver' in window)) {
        videos.forEach(function(video) {
            video.play().catch(function() {});
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(function() {});
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.35
    });

    videos.forEach(function(video) {
        observer.observe(video);
    });
}

window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (!scrollButton) {
        return;
    }

    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    setupDemoVideoAutoplay();
});
