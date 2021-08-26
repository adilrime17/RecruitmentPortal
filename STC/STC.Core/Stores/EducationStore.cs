using STC.Common.Requests;
using STC.Common.Responses;
using STC.Data;
using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using STC.Common.MiscUtil;
using Microsoft.EntityFrameworkCore;

namespace STC.Core.Stores
{
    public class EducationStore
    {
        private readonly STCDbContext _dbContext;

        public EducationStore(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<SelectResponse> GetAllMaxQualifications() {
            return _dbContext.Qualifications.Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            }).ToList();
        }

        public IList<SelectResponse> GetAllLevels()
        {
            return _dbContext.EducationLevels.Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            }).ToList();
        }

        public IList<SelectResponse> GetAllDegrees(int levelId)
        {
            return _dbContext.EducationDegrees
                .Where(x => x.EducationLevelId == levelId)
                .Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            }).ToList();
        }

        public IList<SelectResponse> GetAllMajors(int levelId)
        {
            return _dbContext.EducationMajors
                .Where(x => x.EducationLevelId == levelId)
                .Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            }).ToList();
        }

        public IList<SelectResponse> GetAllSubjects(int majorId)
        {
            return _dbContext.EducationSubjects
                .Where(x => x.EducationMajorId == majorId)
                .Select(x => new SelectResponse()
                {
                    Id = x.Id.ToString(),
                    Label = x.Name
                }).ToList();
        }

        public EducationalDataResponse GetEducationalData(string cnic)
        {
            Candidate candidate = _dbContext.Candidates.Include(x => x.MaxQualification).FirstOrDefault(x => x.Cnic == cnic);
            if(candidate == null)
            {
                return null;
            }
            CandidateHasCourse candidateHasCourse = _dbContext.CandidateHasCourses.First(x => x.CourseId == 1 && x.CandidateCnic == cnic);
            return new EducationalDataResponse()
            {
                MaxQualification = candidate.MaxQualification.Name,
                Ncse = candidate.NCSE,
                RegistrationNo = candidateHasCourse.RegistrationNumber,
                CandidateEducationalData = _dbContext.CandidateHasEducations.Where(x => x.CandidateCnic == cnic)
                .Select(x => new EducationalData()
                {
                    Level = x.EducationLevel.Name,
                    Degree = x.EducationDegree.Name,
                    Major = x.EducationMajor.Name,
                    Subject = x.EducationSubject.Name,
                    Obtained = x.ObtainedMarks,
                    Total = x.TotalMarks,
                    Grade = x.Grade
                }).ToList()
            };
        }

        public bool UpdateEducationalData(string cnic, EducationalDataRequest request)
        {
            IList<CandidateHasEducation> candidateHasEducations = _dbContext.CandidateHasEducations.Where(x => x.CandidateCnic == cnic).ToList();
            foreach(EducationalData data in request.CandidateEducationalData)
            {
                CandidateHasEducation candidateHasEducation = _dbContext.CandidateHasEducations.FirstOrDefault(x => x.CandidateCnic == cnic && x.EducationLevel.Name == data.Level);
                if(candidateHasEducation == null)
                {
                    candidateHasEducation = new CandidateHasEducation();
                    candidateHasEducation.CandidateCnic = cnic;
                    candidateHasEducation.EducationLevelId = _dbContext.EducationLevels.First(x => x.Name == data.Level).Id;
                    if(!string.IsNullOrEmpty(data.Degree))
                    {
                        candidateHasEducation.EducationDegreeId = _dbContext.EducationDegrees.First(x => x.Name == data.Degree).Id;
                    }
                    if (!string.IsNullOrEmpty(data.Major))
                    {
                        candidateHasEducation.EducationMajorId = _dbContext.EducationMajors.First(x => x.Name == data.Major).Id;
                    }
                    if (!string.IsNullOrEmpty(data.Subject))
                    {
                        candidateHasEducation.EducationSubjectId = _dbContext.EducationSubjects.First(x => x.Name == data.Subject).Id;
                    }
                    candidateHasEducation.ObtainedMarks = data.Obtained;
                    candidateHasEducation.TotalMarks = data.Total;
                    candidateHasEducation.Grade = data.Grade;
                    _dbContext.CandidateHasEducations.Add(candidateHasEducation);
                } else {
                    candidateHasEducation.EducationLevelId = _dbContext.EducationLevels.First(x => x.Name == data.Level).Id;
                    if (!string.IsNullOrEmpty(data.Degree))
                    {
                        candidateHasEducation.EducationDegreeId = _dbContext.EducationDegrees.First(x => x.Name == data.Degree).Id;
                    }
                    if (!string.IsNullOrEmpty(data.Major))
                    {
                        candidateHasEducation.EducationMajorId = _dbContext.EducationMajors.First(x => x.Name == data.Major).Id;
                    }
                    if (!string.IsNullOrEmpty(data.Subject))
                    {
                        candidateHasEducation.EducationSubjectId = _dbContext.EducationSubjects.First(x => x.Name == data.Subject).Id;
                    }
                    candidateHasEducation.ObtainedMarks = data.Obtained;
                    candidateHasEducation.TotalMarks = data.Total;
                    candidateHasEducation.Grade = data.Grade;
                }
            }
            return _dbContext.SaveChanges() > 0;
        }
    }
}
