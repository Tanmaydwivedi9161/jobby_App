import './index.css'
import {MdLocationOn} from 'react-icons/md'
import {FaStar, FaBriefcase} from 'react-icons/fa'

const SimilarCard = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
  } = jobs
  return (
    <>
      <li className="similar-jobcard-container">
        <div className="logo-title-container">
          <div className="company-logo-box">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
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

        <div className="description-box">
          <h3 className="description-heading">Description</h3>
          <p className="description-para">{jobDescription}</p>
        </div>
        <div className="location-card">
          <div className="similar-location-and-job-type-card">
            <div className="location">
              <MdLocationOn className="location-icon" />
              <p className="location-para">{location}</p>
            </div>
            <div className="location">
              <FaBriefcase className="location-icon" />
              <p className="location-para">{employmentType}</p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default SimilarCard
