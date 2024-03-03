import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import ShowAllFeedback from './assets/pages/Feedback/ShowAllFeedback';
import CreateFeedback from './assets/pages/Feedback/CreateFeedback';
import ReadOneFeedback from './assets/pages/Feedback/ReadOneFeedback';
import EditFeedbck from './assets/pages/Feedback/EditFeedbck';
import DeleteFeedback from './assets/pages/Feedback/DeleteFeedback';

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<ShowAllFeedback/>} />
        <Route path='/Feedback/Create' element={<CreateFeedback />} />
        <Route path='/Feedback/Read/:id' element={<ReadOneFeedback />} />
        <Route path='/Feedback/Delete/:id' element={<DeleteFeedback />} />
        <Route path='/Feedback/Edit/:id' element={<EditFeedbck/>} />
      </Routes>
    
  );
}

export default App;
