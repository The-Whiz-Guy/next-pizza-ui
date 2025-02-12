import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,  // 1 hour
          sameSite: "strict",
          path: "/",
          httpOnly: true, // Prevents client-side JS from accessing it
          secure: process.env.NODE_ENV === "production", // Secure in production
        })
      );
      return res.status(200).json("Successful");
    } else {
      return res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
