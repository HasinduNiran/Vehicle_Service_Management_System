import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowAllFeedback from './pages/Feedback/ShowAllFeedback';
import CreateFeedback from './pages/Feedback/CreateFeedback';
import ReadOneFeedback from './pages/Feedback/ReadOneFeedback';
import DeleteFeedback from './pages/Feedback/DeleteFeedback';
import EditFeedback from './pages/Feedback/EditFeedback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowAllFeedback />} />
        <Route path='/Feedback/Create' element={<CreateFeedback />} />
        <Route path='/Feedback/Read/:id' element={<ReadOneFeedback />} />
        <Route path='/Feedback/Delete/:id' element={<DeleteFeedback />} />
        <Route path='/Feedback/Edit/:id' element={<EditFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
