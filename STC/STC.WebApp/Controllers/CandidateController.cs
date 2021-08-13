using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using STC.Core.EligibilityCheck;
using STC.Data;
using STC.Data.Models;
using STC.WebApp.MiscUtils;
using STC.WebApp.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly STCDbContext _dbContext;
        private readonly IEligibilityCheckService _eligibilityCheckService;

        public CandidateController(STCDbContext dbContext, IEligibilityCheckService eligibilityCheckService)
        {
            _dbContext = dbContext;
            _eligibilityCheckService = eligibilityCheckService;
        }

        [HttpGet("get/{cnic}")]
        public IActionResult GetCandidateDetails(string cnic)
        {
            return Ok(_dbContext.Candidates.FirstOrDefault(x => x.Cnic == cnic));
        }

        [HttpPost("add")]
        public IActionResult AddCandidate([FromBody] AddCandidateRequest request)
        {
            Candidate candidate = _dbContext.Candidates.FirstOrDefault(x => x.Cnic == request.Cnic);
            if(candidate == null)
            {
                candidate = new Candidate();
                candidate.MiddleName = "";
                ((object)request).CopyProperties(candidate);
                _dbContext.Candidates.Add(candidate);
                _dbContext.SaveChanges();
            }
            // perform eligibility check and return
            bool check = _eligibilityCheckService.Check(candidate, request.Ncse);
            CandidateHasCourse candidateHasCourse = candidate.CandidateHasCourses.FirstOrDefault(x => x.CourseId == 1);
            if (candidateHasCourse == null)
            {
                candidateHasCourse = new CandidateHasCourse()
                {
                    CandidateCnic = candidate.Cnic,
                    CourseId = 1,
                    Status = _dbContext.Statuses.First(x => x.Id == (check ? "eligible" : "non-eligible"))
                };
                _dbContext.CandidateHasCourses.Add(candidateHasCourse);
                _dbContext.SaveChanges();
            }

            return Ok(new
            {
                Registration = _dbContext.Courses.First(x => x.Id == 1).Name + "-" + candidateHasCourse.CandidateCnic + "-" + candidateHasCourse.CourseId,
                Status = check ? "Eligible" : "Non-Eligible"
            });
        }
    }
}
