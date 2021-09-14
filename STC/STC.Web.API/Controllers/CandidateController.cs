using Microsoft.AspNetCore.Mvc;
using STC.Common.Requests;
using STC.Common.Responses;
using STC.Core.Stores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace STC.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly CandidateStore _store;

        public CandidateController(CandidateStore store)
        {
            _store = store;
        }

        /// <summary>
        /// Get Candidate Details
        /// </summary>
        /// <param name="cnic">Candidate CNIC</param>
        /// <returns></returns>
        [HttpGet("{cnic}")]
        public CandidateResponse Get(string cnic)
        {
            return _store.GetDetails(cnic);
        }

        /// <summary>
        /// Get candidate army data
        /// </summary>
        /// <param name="cnic"></param>
        /// <returns></returns>
        [HttpGet("{cnic}/army_data")]
        public CandidateArmyDataResponse GetArmyData(string cnic)
        {
            return _store.GetArmyData(cnic);
        }

        /// <summary>
        /// Get All Candidate summary
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet("summary/{date}")]
        public IEnumerable<CandidateSummaryResponse> GetSummary(DateTime date)
        {
            return _store.GetSummary(date);
        }

        // POST api/<CandidateController>/check_eligibility
        [HttpPost]
        [Route("check_eligibility")]
        public CheckEligibilityResponse Post([FromBody] CandidateCreateRequest request)
        {
            return _store.CheckEligibility(request);
        }

        // PUT api/<CandidateController>/12345-1234567-8
        [HttpPut("{cnic}")]
        public bool UpdateData(string cnic, [FromBody] CandidateCreateRequest request)
        {
            return _store.UpdateData(cnic, request);
        }

        // PUT api/<CandidateController>/12345-1234567-8/army_data
        [HttpPut("{cnic}/army_data")]
        public bool UpdateArmyData(string cnic, [FromBody] CandidateArmyDataRequest request)
        {
            return _store.UpdateArmyData(cnic, request);
        }
    }
}
