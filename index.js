const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const quoteContainer = document.getElementById("quote");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("author");
const quoteImage = document.getElementById("quote-img");
const quoteImageContainer = document.querySelector("#quote div");
const nextQuoteBtn = document.getElementById("next-quote-btn");
const copyBtn = document.getElementById("copy-btn");
const twitterBtn = document.getElementById("tweet-btn");
const exportBtn = document.getElementById("export-btn");

async function fetchQuote() {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

function renderQuote({ content, author }) {
  const seed = Math.floor(Math.random() * 1000);

  quoteText.textContent = content;
  quoteAuthor.textContent = author;
  quoteImage.src = "";
  quoteImage.src = `https://picsum.photos/seed/${seed}/800/600`;
}

nextQuoteBtn.addEventListener("click", async () => {
  const quote = await fetchQuote();
  renderQuote(quote);
});

copyBtn.addEventListener("click", () => {
  const text = `"${quoteText.textContent}" ~ ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text);

  const originalText = copyBtn.innerHTML;
  copyBtn.innerHTML = `
          <i class="ti ti-check"></i> Copied
`;

  copyBtn.setAttribute("disabled", true);
  copyBtn.classList.add("success");

  setTimeout(() => {
    copyBtn.innerHTML = originalText;
    copyBtn.removeAttribute("disabled");
    copyBtn.classList.remove("success");
  }, 2000);
});

twitterBtn.addEventListener("click", () => {
  const text = `"${quoteText.textContent}" ~ ${quoteAuthor.textContent}`;
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, "_blank");
});

exportBtn.addEventListener("click", () => {
  //add loading spinner
  htmlToImage
    .toPng(quoteContainer)
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "quote.png";
      link.click();
    })
    .catch(console.error);
});

fetchQuote().then(renderQuote);
