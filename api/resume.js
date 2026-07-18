module.exports = function handler(req, res) {
  const resume = {
    status: "200 OK",
    message: "(*^o^)八(^o^*) yippee, curious human! Yes it actually works. Can't believe it took so long to figure out.",
    question: "I love helping businesses grow and provide values for others. Let me know how I can help you! Or you can just say hi :)",
    email: "h39807@gmail.com"
  };

  return res.status(200).json(resume);
};
