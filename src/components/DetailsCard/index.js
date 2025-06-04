import './index.css'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const DetailsCard = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    companyLogoUrl,
    employmentType,
    packagePerAnnum,
    skills,
    lifeAtCompany,
  } = jobDetails
  return (
    <>
      <li className="jobcard-container">
        <div className="logo-title-container">
          <div className="company-logo-box">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="weblink-box">
            <h1 className="description-heading">Description</h1>
          </div>
          <p className="description-para">{jobDescription}</p>
        </div>
        <div className="skills-container">
          <h3 className="skills">Skills</h3>
          <ul className="skills-list">
            {skills &&
              skills.length > 0 &&
              skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-icon"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
          </ul>
        </div>

        {lifeAtCompany && (
          <div className="life-at-company-container">
            <h3 className="life-heading">Life at Company</h3>
            <div className="life-at-company-content">
              <p className="life-description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>
        )}
      </li>
    </>
  )
}

export default DetailsCard
