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

        // GET: api/<CandidateController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CandidateController>/5
        [HttpGet("{cnic}")]
        public CandidateResponse Get(string cnic)
        {
            return _store.GetDetails(cnic);
        }

        // GET api/<CandidateController>/5/army_data
        [HttpGet("{cnic}/army_data")]
        public CandidateArmyDataResponse GetArmyData(string cnic)
        {
            return _store.GetArmyData(cnic);
        }

        // POST api/<CandidateController>/check_eligibility
        [HttpPost]
        [Route("check_eligibility")]
        public CheckEligibilityResponse Post([FromBody] CandidateCreateRequest request)
        {
            return _store.CheckEligibility(request);
        }

        // POST api/<CandidateController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
            return _store.UpdateData(cnic, request);
        }

        // DELETE api/<CandidateController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
