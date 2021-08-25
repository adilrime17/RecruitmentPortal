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
    public class TestsController : ControllerBase
    {
        private readonly TestsStore _store;

        public TestsController(TestsStore store)
        {
            _store = store;
        }

        // GET api/<TestsController>/12345-1234567-1
        [HttpGet("{cnic}")]
        public TestsResponse GetTestsToAppear(string cnic)
        {
            return _store.GetTestsToAppear(cnic);
        }

        // GET api/<TestsController>/12345-1234567-1/slip
        [HttpGet("{cnic}/slip")]
        public TestsSlipResponse GetPrintSlip(string cnic)
        {
            return _store.GetPrintSlip(cnic);
        }

        // GET api/<TestsController>/12345-1234567-1/summary
        [HttpGet("{cnic}/summary")]
        public CandidateMarksSummaryResponse GetCandidateMarksSummary(string cnic)
        {
            return _store.GetCandidateMarksSummary(cnic);
        }

        /// <summary>
        /// Get candidate PET test details
        /// </summary>
        /// <param name="cnic"></param>
        /// <returns></returns>
        [HttpGet("{cnic}/pet")]
        public CandidatePETTestDetailResponse GetCandidatePETTestDetails(string cnic)
        {
            return _store.GetCandidatePETTestDetail(cnic);
        }

        /// <summary>
        /// Get candidate test details
        /// </summary>
        /// <param name="cnic"></param>
        /// <param name="testName"></param>
        /// <returns></returns>
        [HttpGet("{cnic}/{testName}")]
        public CandidateTestDetailResponse GetCandidateTestDetails(string cnic, string testName)
        {
            return _store.GetCandidateTestDetail(cnic, testName);
        }

        // PUT api/<TestsController>/12345-1234567-1
        [HttpPut("{cnic}")]
        public bool UpdateTestsToAppear(string cnic, [FromBody] TestsRequest request)
        {
            return _store.UpdateTestsToAppear(cnic, request);
        }

        // GET api/<TestsController>/12345-1234567-1/test_name
        [HttpPut("{cnic}/summary")]
        public bool UpdateCandidateMarksSummary(string cnic, string testName, [FromBody] CandidateMarksSummaryRequest request)
        {
            return _store.UpdateCandidateMarksSummary(cnic, request);
        }

        /// <summary>
        /// Update candidate PET test details
        /// </summary>
        /// <param name="cnic"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{cnic}/pet")]
        public bool UpdateCandidatePETTestDetails(string cnic, [FromBody] CandidatePETTestDetailRequest request)
        {
            return _store.UpdateCandidatePETTestDetail(cnic, request);
        }

        // GET api/<TestsController>/12345-1234567-1/test_name
        [HttpPut("{cnic}/{testName}")]
        public bool UpdateCandidateTestDetails(string cnic, string testName, [FromBody] CandidateTestDetailRequest request)
        {
            return _store.UpdateCandidateTestDetail(cnic, testName, request);
        }
    }
}
