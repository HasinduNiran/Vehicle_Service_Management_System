import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowAllFeedback from './pages/Feedback/ShowAllFeedback';
import CreateFeedback from './pages/Feedback/CreateFeedback';
import ReadOneFeedback from './pages/Feedback/ReadOneFeedback';
import DeleteFeedback from './pages/Feedback/DeleteFeedback';
import EditFeedback from './pages/Feedback/EditFeedback';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ShowAllFeedback />} />
      <Route path='/Feedback/Create' element={<CreateFeedback />} />
      <Route path='/Feedback/Read/:id' element={<ReadOneFeedback />} />
      <Route path='/Feedback/Delete/:id' element={<DeleteFeedback />} />
      <Route path='/Feedback/Edit/:id' element={<EditFeedback />} />
    </Routes>
  );
}

export default App;
