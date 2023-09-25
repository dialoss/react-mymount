
const disqusName = 'my75';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initDisqus() {
    let disqus_thread = document.createElement("div");
    disqus_thread.id = "disqus_thread";
    let comments = document.querySelector(".comments");
    comments.querySelector(".container").appendChild(disqus_thread);
    (function() {
        var d = document, s = d.createElement('script');
        s.src = `https://${disqusName}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
}

export async function initComment(page, page_id) {
    let page_url = Nav.baseURL + "#!" + page.slice(1, page.length - 1) + '/';
    try {
        window.DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = page_id;
                this.page.url = page_url;
            }
        });
    } catch {
        initDisqus();
        await sleep(100);
        initComment(page, page_id);
        return;
    }
    await sleep(500);
}

export function initComments() {
    fetch("/get_disqus_ids/").then(response => response.json()).then(async (data) => {
        for (const page_data of data.data) {
            let page = page_data[0];
            let page_slug = page_data[1];
            initComment(page, page_slug);
        }
    });
}
