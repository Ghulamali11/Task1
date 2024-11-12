import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';

function MainPanel() {
  const {
    selectedChapter,
    selectedCategory,
    expandedQuestionId,
    setExpandedQuestionId,
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
  const sidebarRefs = useRef({});

  // Intersection Observer to expand the first visible question in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter entries that are fully in the viewport
        const visibleEntries = entries.filter((entry) => entry.intersectionRatio === 1);
        if (visibleEntries.length > 0) {
          const firstVisibleEntry = visibleEntries[0];
          const questionId = parseInt(firstVisibleEntry.target.getAttribute('data-id'));

          // Expand only the question that is fully in view
          setExpandedQuestionId(questionId);
        }
      },
      { threshold: 1 } // Ensure the question is 100% in view before triggering
    );

    // Observe each question
    Object.values(questionRefs.current).forEach((questionRef) => {
      if (questionRef) observer.observe(questionRef);
    });

    return () => {
      Object.values(questionRefs.current).forEach((questionRef) => {
        if (questionRef) observer.unobserve(questionRef);
      });
    };
  }, [paginatedQuestions, setExpandedQuestionId]);

  // Auto-scroll sidebar to the category of the expanded question
  useEffect(() => {
    if (expandedQuestionId) {
      // Find the expanded question in the selected category
      const expandedQuestion = questionsToDisplay.find(
        (question) => question.id === expandedQuestionId
      );

      if (expandedQuestion) {
        // Find the category containing the expanded question
        const category = selectedCategory || selectedChapter.categories.find((cat) =>
          cat.questions.some((question) => question.id === expandedQuestionId)
        );

        // Find the corresponding category element in the sidebar
        const categoryElement = sidebarRefs.current[category.id];

        if (categoryElement) {
          // Scroll the category into view in the sidebar
          categoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [expandedQuestionId, questionsToDisplay, selectedCategory, selectedChapter]);

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
