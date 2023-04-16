export default class HomeController {
    constructor() {}
  
    getViewHome = async(req, res) => {
      try {
        res.redirect('/auth/login')
      } catch (error) {
        console.log("error 404");
      }
    };
  }