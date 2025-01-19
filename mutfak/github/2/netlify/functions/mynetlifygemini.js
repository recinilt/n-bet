const { Octokit } = require("@octokit/rest");

exports.handler = async (event) => {
  const { action, email, password } = JSON.parse(event.body);
  const githubToken = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: githubToken });
  const repoOwner = "YOUR_GITHUB_USERNAME"; // GitHub kullanıcı adınızı buraya girin
  const repoName = "YOUR_GITHUB_REPO"; // GitHub depo adınızı buraya girin
  const filename = email.replace("@", ".") + ".txt";

  try {
    if (action === "kayit") {
      try {
        await octokit.rest.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: filename,
        });
        return { statusCode: 400, body: JSON.stringify({ message: "Zaten hesabınız var, lütfen giriş yapın." }) };
      } catch (error) {
        if (error.status === 404) {
          await octokit.rest.repos.createOrUpdateFileContents({
            owner: repoOwner,
            repo: repoName,
            path: filename,
            message: "Yeni kullanıcı kaydı",
            content: Buffer.from(`${email}\n${password}`).toString("base64"),
          });
          return { statusCode: 200, body: JSON.stringify({ message: "Kayıt başarılı." }) };
        } else {
          throw error;
        }
      }
    } else if (action === "giris") {
      try {
        const file = await octokit.rest.repos.getContent({
          owner: repoOwner,
          repo: repoName,
          path: filename,
        });
        const content = Buffer.from(file.data.content, "base64").toString();
        const [storedEmail, storedPassword] = content.split("\n");
        if (password === storedPassword) {
            return { statusCode: 200, body: JSON.stringify({ message: "Giriş başarılı.", data: { email: storedEmail, password: storedPassword }}) };
        } else {
            return { statusCode: 401, body: JSON.stringify({ message: "Yanlış şifre." }) };
        }
      } catch (error) {
        return { statusCode: 404, body: JSON.stringify({ message: "Kullanıcı bulunamadı." }) };
      }
    }
    return { statusCode: 400, body: JSON.stringify({ message: "Geçersiz işlem." }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ message: "Bir hata oluştu." }) };
  }
};