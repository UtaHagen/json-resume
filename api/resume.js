export default function handler(req, res) {
    const { skill, format } = req.query;
  
    const resume = {
      status: "200 OK",
      message: "(*^o^)八(^o^*) yippee, curious human! Yes it actually works. Can't believe it took so long to figure out.",
      question: "I love building data pipelines and data products. Let me know how I can help you!",
      email: "h39807@gmail.com"
    };

    return res.status(200).json(resume);
  }