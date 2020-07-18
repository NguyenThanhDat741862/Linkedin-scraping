const findIndexByText = (arr, text) => arr.findIndex(i => i == text)

module.exports = function parseJobDescriptionDetail (text) {
  const tokens = text.split('\n').filter(i => i !== '')
  const seniorityLevelIndex = findIndexByText(tokens, 'Seniority Level')
  const industryIndex = findIndexByText(tokens, 'Industry')
  const employmentTypeIndex = findIndexByText(tokens, 'Employment Type')
  const jobFunctionsIndex = findIndexByText(tokens, 'Job Functions')
  
  return {
    seniorityLevel: seniorityLevelIndex == -1 ? null : tokens[seniorityLevelIndex + 1],
    industry: industryIndex == -1 ? null : tokens[industryIndex + 1],
    employmentType: employmentTypeIndex == -1 ? null : tokens[employmentTypeIndex + 1],
    jobFunctions: jobFunctionsIndex == -1 ? null : tokens[jobFunctionsIndex + 1]
  }
}