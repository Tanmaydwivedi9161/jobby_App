import './index.css'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'

const JobCard = props => {
  const {job} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="jobcard-container">
        <div className="logo-title-container">
          <div className="company-logo-box">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-box">
              <h1 className="title">{title}</h1>
              <div className="rating-card">
                <FaStar className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="location-card">
          <div className="location-and-job-type-card">
            <div className="location">
              <MdLocationOn className="location-icon" />
              <p className="location-para">{location}</p>
            </div>
            <div className="location">
              <FaBriefcase className="location-icon" />
              <p className="location-para">{employmentType}</p>
            </div>
          </div>
          <div className="lpa-box">
            <p className="lpa-para">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-box">
          <h1 className="description-heading">Description</h1>
          <p className="description-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
