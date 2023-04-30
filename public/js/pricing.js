const faqData = [
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
        question: "Can I upgrade or downgrade my plan later?",
        answer:
            "Yes, you can upgrade or downgrade your plan at any time.",
    },
    {
        question: "Is there a setup fee?",
        answer:
            "No, there is no setup fee. You only pay for the monthly or annual subscription fee.",
    },
    {
        question: "How does billing work?",
        answer:
            "Billing is done on a monthly or annual basis, depending on the plan you choose. You will be charged automatically at the beginning of each billing cycle.",
    },
    {
        question: "What features are included in each plan?",
        answer:
            "You can view a detailed list of features included in each plan on our pricing page.",
    },
    {
        question: "Are there any hidden fees or charges?",
        answer:
            "No, there are no hidden fees or charges. The price you see on the pricing page is the price you will pay.",
    },
];

const faqContainer = document.querySelector(".faq-container");

faqData.forEach((data) => {

    const questionBtn = document.createElement("button");
    questionBtn.classList.add("faq-page");
    questionBtn.textContent = data.question;

    const answerDiv = document.createElement("div");
    answerDiv.classList.add("faq-body");
    answerDiv.style.display = "none";
    const answerText = document.createElement("p");
    answerText.textContent = data.answer;
    answerDiv.appendChild(answerText);


    faqContainer.appendChild(questionBtn);
    faqContainer.appendChild(answerDiv);

    questionBtn.addEventListener("click", () => {
        questionBtn.classList.toggle("active");
        answerDiv.style.display =
            answerDiv.style.display === "none" ? "block" : "none";
    });
});
