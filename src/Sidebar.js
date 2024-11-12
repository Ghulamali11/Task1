import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function Sidebar() {
  const {
    chapters,
    selectedChapter,
    selectedCategory,
    selectedQuestion,
    expandedQuestionId, // To check which question is expanded
    handleChapterClick,
    handleCategoryClick,
    handleQuestionClick
  } = useContext(AppContext);

  return (
    <div className="sidebar" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
      {chapters.map((chapter) => (
        <div key={chapter.id}>
          <div
            onClick={() => handleChapterClick(chapter)}
            style={{ fontWeight: selectedChapter === chapter ? 'bold' : 'normal', cursor: 'pointer' }}
          >
            {chapter.title}
          </div>

          {/* Show all questions under the selected chapter if chapter is selected */}
          {selectedChapter === chapter &&
            chapter.categories.map((category) => (
              <div key={category.id} style={{ marginLeft: '20px' }}>
                <div
                  onClick={() => handleCategoryClick(category)}
                  style={{ cursor: 'pointer', color: selectedCategory === category ? 'blue' : 'black' }}
                >
                  {category.title}
                </div>

                {/* Show questions under the selected category */}
                {selectedCategory === category &&
                  category.questions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => handleQuestionClick(question)}
                      style={{
                        marginLeft: '40px',
                        cursor: 'pointer',
                        color: selectedQuestion === question ? 'green' : 'black',
                        fontWeight: expandedQuestionId === question.id ? 'bold' : 'normal',
                        backgroundColor: expandedQuestionId === question.id ? '#e3f2fd' : 'transparent' // Highlight expanded question
                      }}
                    >
                      {question.text}
                    </div>
                  ))}
              </div>
            ))}

          {/* Show all questions directly under the selected chapter */}
          {selectedChapter === chapter && selectedCategory === null &&
            chapter.categories.map((category) =>
              category.questions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  style={{
                    marginLeft: '40px',
                    cursor: 'pointer',
                    color: selectedQuestion === question ? 'green' : 'black',
                    fontWeight: expandedQuestionId === question.id ? 'bold' : 'normal',
                    backgroundColor: expandedQuestionId === question.id ? '#e3f2fd' : 'transparent' // Highlight expanded question
                  }}
                >
                  {question.text}
                </div>
              ))
            )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
