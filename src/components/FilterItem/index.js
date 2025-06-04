import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class FilterItem extends Component {
  state = {
    profileDetails: {},
  }

  componentDidMount() {
    this.getUserDetails()
  }

  handleEmploymentTypeChange = event => {
    const {onChangeEmploymentType} = this.props
    const {id, checked} = event.target
    onChangeEmploymentType(id, checked)
  }

  handleSalaryChange = event => {
    const {onChangeSalaryRange} = this.props
    onChangeSalaryRange(event.target.id)
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({profileDetails: data.profile_details})
    }
  }

  render() {
    const {profileDetails} = this.state
    const {
      name,
      profile_image_url: profileImageUrl,
      short_bio: shortBio,
    } = profileDetails

    return (
      <div className="filter-item-container">
        <div className="profile-card">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
        <hr className="line" />

        <div className="filter-section">
          <h2 className="filter-title">Type of Employment</h2>
          {employmentTypesList.map(each => (
            <div key={each.employmentTypeId} className="checkbox-item">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                onChange={this.handleEmploymentTypeChange}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
            </div>
          ))}
        </div>

        <hr className="line" />

        <div className="filter-section">
          <h2 className="filter-title">Salary Range</h2>
          {salaryRangesList.map(each => (
            <div key={each.salaryRangeId} className="radio-item">
              <input
                type="radio"
                name="salary"
                id={each.salaryRangeId}
                onChange={this.handleSalaryChange}
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default FilterItem
