import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import DetailsCard from '../DetailsCard'
import SimilarCard from '../SimilarCard'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: 'INITIAL', // NEW STATE: 'SUCCESS', 'FAILURE'
  }

  componentDidMount() {
    this.getJobDetail()
  }

  getJobDetail = async () => {
    this.setState({apiStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const jobDetails = {
          id: data.job_details.id,
          title: data.job_details.title,
          rating: data.job_details.rating,
          location: data.job_details.location,
          jobDescription: data.job_details.job_description,
          companyLogoUrl: data.job_details.company_logo_url,
          employmentType: data.job_details.employment_type,
          packagePerAnnum: data.job_details.package_per_annum,
          companyWebsiteUrl: data.job_details.company_website_url,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          skills: data.job_details.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
        }

        const similarJobs = data.similar_jobs.map(job => ({
          id: job.id,
          title: job.title,
          rating: job.rating,
          location: job.location,
          jobDescription: job.job_description,
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
        }))

        this.setState({
          jobDetails,
          similarJobs,
          apiStatus: 'SUCCESS',
        })
      } else {
        this.setState({apiStatus: 'FAILURE'})
      }
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-button" onClick={this.getJobDetail}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="jobDetails-container">
        <DetailsCard jobDetails={jobDetails} />
        <div className="similar-card-items">
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-job-match-box">
            {similarJobs.map(job => (
              <SimilarCard jobs={job} key={job.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <>
        <Header />
        {apiStatus === 'FAILURE'
          ? this.renderFailureView()
          : this.renderSuccessView()}
      </>
    )
  }
}

export default JobItemDetails
