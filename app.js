//global variables   ************************
const linksContainer = document.querySelector(".links-container");
const form = document.querySelector("form");

// copy to clipboard function  ****************
const copyClipboard = (target) => {
  let copyText = target.closest(".links-container").children[1].innerText;
  navigator.clipboard.writeText(copyText);
};

//eventlistner on copybtn  ********************
document.addEventListener("click", (e) => {
  if (e.target.matches("button") && e.target.classList.contains("copy")) {
    copyClipboard(e.target);
  }
});

// Show error on screen function  ****************
const showError = () => {
  let formData = new FormData(form);
  const errorMsg = document.querySelector(".error-msg");
  errorMsg.classList.add("show");
  //clearing input value
  form["url"].value = "";
  setTimeout(() => {
    errorMsg.classList.remove("show");
  }, 3000);
};

// Verifying url Function *********************
const verifyURL = () => {
  let expression =
    /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/|www\.)[a-zA-Z0-9!$_.~-]+\.[a-zA-Z]{2,6}|[\/][a-zA-Z0-9?!$_=\.-~]+/gm;
  let regex = new RegExp(expression);

  let formData = new FormData(form);
  const inputUrl = form["url"].value;

  // collecting form to get input value
  if (inputUrl == "" || inputUrl === " ") {
    showError();
  }

  // Checking url start with www *********
  else if (inputUrl.match(regex) && inputUrl.startsWith("www.")) {
    let href = formData.get("url");
    if (href.startsWith("www.")) {
      href = `https://${href}`;
      const url = new URL(href);
      putLinks(url.host, url.href);
      shortLink();

      linksContainer.classList.add("active");
    }
  }

  // Checking url start with https or http *********
  else if (inputUrl.match(regex) && inputUrl.startsWith("http")) {
    let href = formData.get("url");
    if (href.startsWith("https://") || href.startsWith("http://")) {
      const url = new URL(href);
      putLinks(url.host, url.href);
      shortLink();

      linksContainer.classList.add("active");
    }
  } else {
    showError();
  }
};


// Pasting links on links-container box function  ****************
const putLinks = (host, href) => {
  let defaultLink = document.querySelector(".default-link");
  let shortLink = document.querySelector(".short-link");
  defaultLink.textContent = host;
};


// Converting into short link function *****************
const shortLink = () => {
  let shortLink = document.querySelector(".short-link");

  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function randomStr(len, str) {
    let ans = "";
    for (let i = len; i > 0; i--) {
      ans += str[Math.floor(Math.random() * str.length)];
    }
    return ans;
  }
  return shortLink.textContent = `http://myt.lb/${randomStr(3, str)}`;

};


//Form eventlistner on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  verifyURL();
  form["url"].value = "";

});
