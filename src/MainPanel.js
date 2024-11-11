import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';

function MainPanel() {
  const {
    selectedChapter,
    selectedCategory,
    expandedQuestionId,
    handleQuestionClick,
    setExpandedQuestionId
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState({});

  // Determine questions to display
  let questionsToDisplay = selectedCategory 
    ? selectedCategory.questions 
    : selectedChapter 
      ? selectedChapter.categories.flatMap((category) => category.questions) 
      : [];
  const totalQuestions = questionsToDisplay.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const paginatedQuestions = questionsToDisplay.slice(startIndex, endIndex);

  const questionRefs = useRef({});

  // Intersection Observer to expand the first visible question in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort visible entries by their position in the viewport (top to bottom)
          const sortedEntries = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const firstVisibleEntry = sortedEntries[0];
          const questionId = parseInt(firstVisibleEntry.target.getAttribute('data-id'));
          
          // Set the expanded question to the first fully visible one
          setExpandedQuestionId(questionId);
        }
      },
      { threshold:1 
        
      } // Trigger only when 100% of the question is in view
    );

    // Observe each question
    Object.values(questionRefs.current).forEach((questionRef) => {
      if (questionRef) observer.observe(questionRef);
    });

    // Cleanup the observer
    return () => {
      Object.values(questionRefs.current).forEach((questionRef) => {
        if (questionRef) observer.unobserve(questionRef);
      });
    };
  }, [paginatedQuestions, setExpandedQuestionId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNoteChange = (questionId, value) => {
    setNotes((prev) => ({ ...prev, [questionId]: value }));
  };

  if (!selectedChapter) {
    return <div className="main-panel">Please select a chapter.</div>;
  }

  return (
    <div className="main-panel">
      <h3>{selectedCategory ? selectedCategory.title : selectedChapter.title}</h3>
      <div className="questions-container">
        {paginatedQuestions.map((question) => (
          <div
            key={question.id}
            ref={(el) => (questionRefs.current[question.id] = el)}
            data-id={question.id}
            style={{ marginBottom: '15px' }}
          >
            <div
              onClick={() => handleQuestionClick(question)}
              style={{
                cursor: 'pointer',
                color: expandedQuestionId === question.id ? 'green' : 'black',
                padding: '10px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <h4>{question.text}</h4>
            </div>
            {expandedQuestionId === question.id && (
              <div className="question-details">
                <p>{question.details}</p>
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
                <textarea
                  placeholder="Enter Your Reason..."
                  value={notes[question.id] || ''}
                  onChange={(e) => handleNoteChange(question.id, e.target.value)}
                  style={{ width: '100%', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
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
