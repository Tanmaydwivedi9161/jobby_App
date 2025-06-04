import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import FilterItem from '../FilterItem'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobList: [],
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
    apiStatus: apiStatusConstants.INITIAL,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeEmploymentType = (employmentTypeId, isChecked) => {
    this.setState(prevState => {
      const {employmentTypes} = prevState
      if (isChecked) {
        return {employmentTypes: [...employmentTypes, employmentTypeId]}
      }
      return {
        employmentTypes: employmentTypes.filter(
          type => type !== employmentTypeId,
        ),
      }
    }, this.getAllJobs)
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getAllJobs)
  }

  onSearch = () => {
    this.getAllJobs()
  }

  convertToCamelCase = job => ({
    id: job.id,
    title: job.title,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
  })

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypes, salaryRange, searchInput} = this.state

    const employmentParam = employmentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentParam}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(this.convertToCamelCase)
      this.setState({
        jobList: updatedJobs,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.FAILURE,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getAllJobs}>
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobList = () => {
    const {jobList} = this.state
    if (jobList.length === 0) {
      return this.renderNoJobsView()
    }

    return (
      <ul className="all-jobs">
        {jobList.map(each => (
          <JobCard job={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderJobsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return this.renderLoader()
      case apiStatusConstants.SUCCESS:
        return this.renderJobList()
      case apiStatusConstants.FAILURE:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="filter-box">
            <FilterItem
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="job-content">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchInputChange}
                className="search-input"
              />
              <button
                className="search-btn"
                onClick={this.onSearch}
                data-testid="searchButton"
                type="button"
              >
                <FaSearch />
              </button>
            </div>
            {this.renderJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
