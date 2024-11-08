import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const jsonData = {
  chapters: [
    {
      id: 1,
      title: "CHP#1",
      categories: [
        {
          id: 1,
          title: "Category 1",
          questions: [
            { id: 101, text: "1. What is the capital of Germany?", details: "The capital of Germany is Berlin." },
            { id: 102, text: "2. Who invented the telephone?", details: "The telephone was invented by Alexander Graham Bell." },
            { id: 103, text: "3. What is the speed of light?", details: "The speed of light is 299,792 km/s." },
            { id: 104, text: "4. What is the largest planet?", details: "Jupiter is the largest planet in our solar system." },
            { id: 105, text: "5. What is H2O?", details: "H2O is the chemical formula for water." },
            { id: 106, text: "6. Who wrote 'Hamlet'?", details: "Shakespeare wrote 'Hamlet'." },
            { id: 107, text: "7. What is the atomic number of Oxygen?", details: "The atomic number of Oxygen is 8." },
            { id: 108, text: "8. Where is the Eiffel Tower located?", details: "The Eiffel Tower is in Paris, France." },
            { id: 109, text: "9. What is the boiling point of water?", details: "Water boils at 100°C at sea level." },
            { id: 110, text: "10. What is the largest ocean?", details: "The Pacific Ocean is the largest ocean." },
            { id: 111, text: "11. What is the tallest mountain?", details: "Mount Everest is the tallest mountain." },
            { id: 112, text: "12. What is the capital of Japan?", details: "The capital of Japan is Tokyo." },
            { id: 113, text: "13. Who painted the Mona Lisa?", details: "Leonardo da Vinci painted the Mona Lisa." },
            { id: 114, text: "14. What is the formula for area of a circle?", details: "The formula is πr²." },
            { id: 115, text: "15. What is the capital of Australia?", details: "The capital of Australia is Canberra." },
            { id: 116, text: "16. What is the freezing point of water?", details: "Water freezes at 0°C." },
            { id: 117, text: "17. Who discovered gravity?", details: "Isaac Newton discovered gravity." },
            { id: 118, text: "18. What is the atomic symbol for gold?", details: "The symbol for gold is Au." },
            { id: 119, text: "19. What is the capital of Canada?", details: "The capital of Canada is Ottawa." },
            { id: 120, text: "20. What is the primary gas in Earth's atmosphere?", details: "Nitrogen is the primary gas." }
          ]
        },
        {
          id: 2,
          title: "Category 2",
          questions: [
            { id: 201, text: "21. What is photosynthesis?", details: "Photosynthesis is the process plants use to convert sunlight into energy." },
            { id: 202, text: "22. What is the tallest building in the world?", details: "The Burj Khalifa in Dubai is the tallest building." },
            { id: 203, text: "23. What is the currency of Japan?", details: "The currency of Japan is Yen." },
            { id: 204, text: "24. What does DNA stand for?", details: "DNA stands for Deoxyribonucleic Acid." },
            { id: 205, text: "25. Who was the first President of the USA?", details: "George Washington was the first President." },
            { id: 206, text: "26. What is the capital of Italy?", details: "The capital of Italy is Rome." },
            { id: 207, text: "27. What is the hardest natural substance?", details: "Diamond is the hardest natural substance." },
            { id: 208, text: "28. What is the largest desert?", details: "The Sahara is the largest hot desert." },
            { id: 209, text: "29. What is the chemical symbol for Iron?", details: "The symbol for Iron is Fe." },
            { id: 210, text: "30. What is the smallest prime number?", details: "The smallest prime number is 2." },
            { id: 211, text: "31. Who wrote '1984'?", details: "George Orwell wrote '1984'." },
            { id: 212, text: "32. What is the capital of Russia?", details: "The capital of Russia is Moscow." },
            { id: 213, text: "33. What is the heaviest element?", details: "Osmium is the heaviest element." },
            { id: 214, text: "34. What planet is known as the Red Planet?", details: "Mars is known as the Red Planet." },
            { id: 215, text: "35. What is the square root of 64?", details: "The square root of 64 is 8." },
            { id: 216, text: "36. What is the largest country by area?", details: "Russia is the largest country by area." },
            { id: 217, text: "37. Who invented the light bulb?", details: "Thomas Edison is credited with inventing the light bulb." },
            { id: 218, text: "38. What is the chemical symbol for Sodium?", details: "The symbol for Sodium is Na." },
            { id: 219, text: "39. What is the capital of Egypt?", details: "The capital of Egypt is Cairo." },
            { id: 220, text: "40. What is the fastest land animal?", details: "The cheetah is the fastest land animal." }
          ]
        }
      ]
    }
  ]
};

export const AppProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedCategory(null);
    setSelectedQuestion(null);
    setExpandedQuestionId(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedQuestion(null);
    setExpandedQuestionId(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setExpandedQuestionId(question.id);
  };

  return (
    <AppContext.Provider
      value={{
        chapters: jsonData.chapters,
        selectedChapter,
        selectedCategory,
        selectedQuestion,
        expandedQuestionId,
        handleChapterClick,
        handleCategoryClick,
        handleQuestionClick,
        setExpandedQuestionId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
