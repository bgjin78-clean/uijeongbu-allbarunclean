(function () {
  const YUPUM_SERVICES = ["유품정리", "고독사청소", "특수청소", "유품+특수청소"];
  const CASES_BASE = "/images/cases";

  const REVIEWS = [
    { area: "민락동", service: "유품정리", title: "의정부시 민락동 아파트 유품정리", text: "민락신도시 대단지에서 유품 분류와 폐기물 반출 후 공간을 정돈한 사례입니다. 지하주차장 반출 동선을 사전에 확인했습니다." },
    { area: "호원동", service: "이사폐기물처리", title: "의정부시 호원동 이사폐기물처리", text: "호원역 인근 아파트에서 이사 일정에 맞춰 가구와 생활폐기물을 한 번에 정리·반출한 사례입니다." },
    { area: "신곡동", service: "쓰레기집청소", title: "의정부시 신곡동 쓰레기집청소", text: "장기간 방치된 생활폐기물을 분류·포장·상차까지 진행한 사례입니다." },
    { area: "녹양동", service: "빈집정리", title: "의정부시 녹양동 빈집정리", text: "임대 전 남은 가구와 생활폐기물을 정리해 공실 상태로 마무리한 사례입니다." },
    { area: "의정부2동", service: "고독사청소", title: "의정부시 의정부2동 고독사청소", text: "구도심 빌라 현장에서 오염 정리와 소독, 냄새 저감 작업을 단계적으로 진행한 사례입니다." },
    { area: "용현동", service: "가정폐기물처리", title: "의정부시 용현동 가정폐기물처리", text: "대형 가구와 생활용품을 하루 만에 분류·반출한 사례입니다." },
    { area: "장암동", service: "특수청소", title: "의정부시 장암동 특수청소", text: "장기간 방치된 공간의 오염 정리와 소독을 함께 진행한 사례입니다." },
    { area: "가능동", service: "폐업폐기물처리", title: "의정부시 가능동 폐업폐기물처리", text: "상가 폐업 후 남은 집기와 폐기물을 현장 조건에 맞춰 처리한 사례입니다." },
    { area: "의정부1동", service: "유품정리", title: "의정부시 의정부1동 유품정리", text: "의정부역 인근 주거 공간에서 보관 물품 분류 후 정리·반출한 사례입니다." },
    { area: "고산동", service: "폐기물처리", title: "의정부시 고산동 가정폐기물 대량 반출", text: "외곽 주택지에서 오래된 가구와 생활폐기물을 한 번에 정리·상차한 사례입니다." },
    { area: "회룡동", service: "빈집정리", title: "의정부시 회룡동 빈집정리", text: "주택 매매 전 남은 짐과 생활폐기물을 정리한 사례입니다." }
  ];

  function pad3(n) {
    return String(n).padStart(3, "0");
  }

  function isYupumService(service) {
    return YUPUM_SERVICES.indexOf(service) !== -1
      || service.indexOf("유품") !== -1
      || service === "고독사청소"
      || service === "특수청소";
  }

  function randomCaseNum(service) {
    const yupum = isYupumService(service);
    const min = yupum ? 1 : 51;
    const max = yupum ? 50 : 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function caseImages(num, service) {
    const yupum = isYupumService(service);
    const id = pad3(num);
    if (yupum) {
      return {
        before: CASES_BASE + "/before-" + id + ".jpg",
        after: CASES_BASE + "/after-" + id + ".jpg"
      };
    }
    return {
      before: CASES_BASE + "/waste-before-" + id + ".jpg",
      after: CASES_BASE + "/waste-after-" + id + ".jpg"
    };
  }

  function renderReviews(filterArea) {
    const list = document.getElementById("reviewList");
    if (!list) return;

    list.innerHTML = "";

    REVIEWS.forEach(function (review) {
      if (filterArea && !review.area.includes(filterArea) && !filterArea.includes(review.area)) return;

      const caseNum = randomCaseNum(review.service);
      const imgs = caseImages(caseNum, review.service);
      const article = document.createElement("article");
      article.className = "review-card";
      article.setAttribute("data-area", review.area);
      article.innerHTML =
        '<span class="tag">' + review.service + "</span>" +
        "<strong>" + review.title + "</strong>" +
        '<div class="photo-row photo-row--pair" style="margin:14px 0">' +
        '<img src="' + imgs.before + '" alt="' + review.title + ' 작업 전" loading="lazy" />' +
        '<img src="' + imgs.after + '" alt="' + review.title + ' 작업 후" loading="lazy" />' +
        "</div>" +
        "<p>" + review.text + "</p>";

      list.appendChild(article);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const area = params.get("area");
  if (area) {
    const label = document.getElementById("filterLabel");
    if (label) label.textContent = area + " 작업후기입니다.";
  }

  renderReviews(area);
})();
