import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';

function MainPanel() {
  const {
    selectedChapter,
    selectedCategory,
    selectedQuestion,
    expandedQuestionId,
    handleQuestionClick,
    setExpandedQuestionId
  } = useContext(AppContext);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // State to manage the answers and notes
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});

  // Determine which questions to display
  let questionsToDisplay = [];
  if (selectedCategory) {
    questionsToDisplay = selectedCategory.questions;
  } else if (selectedChapter) {
    questionsToDisplay = selectedChapter.categories.flatMap((category) => category.questions);
  }

  // Pagination calculations
  const totalQuestions = questionsToDisplay.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const paginatedQuestions = questionsToDisplay.slice(startIndex, endIndex);

  // Handlers for page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handlers for radio buttons and text input
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNoteChange = (questionId, value) => {
    setNotes((prev) => ({ ...prev, [questionId]: value }));
  };

  // Toggle expand/collapse for a question
  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestionId((prevId) => (prevId === questionId ? null : questionId));
  };

  // Effect to expand the selected question when it's clicked in the Sidebar
  useEffect(() => {
    if (selectedQuestion) {
      setExpandedQuestionId(selectedQuestion.id);
      const questionIndex = questionsToDisplay.findIndex((q) => q.id === selectedQuestion.id);

      // Only set the page if the question exists in the current list
      if (questionIndex !== -1) {
        setCurrentPage(Math.floor(questionIndex / questionsPerPage) + 1);
      }
    }
    // Reset expanded question if selectedQuestion changes
  }, [selectedQuestion, questionsToDisplay, setExpandedQuestionId]);

  if (!selectedChapter) {
    return <div className="main-panel">Please select a chapter.</div>;
  }

  return (
    <div className="main-panel">
      <h3>{selectedCategory ? selectedCategory.title : selectedChapter.title}</h3>

      {/* Scrollable Questions Container */}
      <div className="questions-container">
        {paginatedQuestions.map((question) => (
          <div key={question.id} style={{ marginBottom: '15px' }}>
            {/* Question Header */}
            <div
              onClick={() => {
                handleQuestionClick(question);
                toggleQuestionExpand(question.id);
              }}
              style={{
                cursor: 'pointer',
                color: expandedQuestionId === question.id ? 'green' : 'black',
                padding: '10px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <h4>{question.text}</h4>
            </div>

            {/* Expanded Section for Details */}
            {expandedQuestionId === question.id && (
              <div className="question-details">
                <p>{question.details}</p>

                {/* Radio Buttons */}
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value="YES"
                      checked={answers[question.id] === 'YES'}
                      onChange={() => handleAnswerChange(question.id, 'YES')}
                    />
                    YES
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value="NO"
                      checked={answers[question.id] === 'NO'}
                      onChange={() => handleAnswerChange(question.id, 'NO')}
                    />
                    NO
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value="N/A"
                      checked={answers[question.id] === 'N/A'}
                      onChange={() => handleAnswerChange(question.id, 'N/A')}
                    />
                    N/A
                  </label>
                </div>

                {/* Input Text Area */}
                <textarea
                  placeholder=" Enter You Reason..."
                  value={notes[question.id] || ''}
                  onChange={(e) => handleNoteChange(question.id, e.target.value)}
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalQuestions > questionsPerPage && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1} style={{ marginRight: '10px' }}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
            Next
          </button>  
        </div>
      )}
    </div>
  );
}

export default MainPanel;
