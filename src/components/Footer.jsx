import '../styles/Footer.css'
import github_logo_light from '../assets/github_logo_light.png'

const repoLink = "https://github.com/itspladd/capensis"

export default function Footer() {
  return(
    <div id="footer">
      <p>Created by <a href="https://pladd.dev">Paul Ladd</a></p>
      <div>
        <p>Hosted on <a href={repoLink}>Github</a></p>
        <a href={repoLink}>
          <img src={github_logo_light} alt="GitHub logo"/>
        </a>
      </div>
    </div>
  )
}