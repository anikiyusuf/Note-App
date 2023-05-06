const express = require('express');
const dashBoardRouter = express.Router();
const { isLoggedIn } = require("../middleware/Auths")
// const dashboardController = require('../Controllers/NotesController');
 const { dashboard , dashboardDeleteNote,dashboardViewNote, dashboardUpdateNote,  dashboardAddNoteSubmit , dashboardAddNote , dashboardSearch , dashboardSearchSubmit} = require("../Controllers/NotesController")
/**
 * Dashboard Routes 
*/
// dashBoardRouter.get('/dashboard', isLoggedIn, dashboardController.dashboard);
// dashBoardRouter.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
// dashBoardRouter.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
// dashBoardRouter.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
// dashBoardRouter.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
// dashBoardRouter.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);
// dashBoardRouter.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
// dashBoardRouter.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);
dashBoardRouter.get("/note" , isLoggedIn  , dashboard)
dashBoardRouter.get("/note/item/id" , isLoggedIn , dashboardViewNote)
dashBoardRouter.get("note/add" , isLoggedIn , dashboardAddNote)
dashBoardRouter.post("/note/add" , isLoggedIn , dashboardAddNoteSubmit)
dashBoardRouter.put("note/item/id", isLoggedIn , dashboardUpdateNote )
dashBoardRouter.delete("/note/delete/:id" , isLoggedIn ,dashboardDeleteNote)
dashBoardRouter.get("/note/search" , isLoggedIn , dashboardSearch)
dashBoardRouter.post("/note/search" , isLoggedIn , dashboardSearchSubmit )


module.exports = dashBoardRouter;