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
    public class EducationController : ControllerBase
    {
        private readonly EducationStore _store;

        public EducationController(EducationStore store)
        {
            _store = store;
        }

        // GET: api/<EducationController>/max_qualification
        [HttpGet]
        [Route("max_qualification")]
        public IEnumerable<SelectResponse> GetMaxQualifications()
        {
            return _store.GetAllMaxQualifications();
        }

        // GET: api/<EducationController>/level
        [HttpGet]
        [Route("level")]
        public IEnumerable<SelectResponse> GetLevels()
        {
            return _store.GetAllLevels();
        }

        // GET: api/<EducationController>/level/{id}/major
        [HttpGet]
        [Route("level/{id}/major")]
        public IEnumerable<SelectResponse> GetMajors(int id)
        {
            return _store.GetAllMajors(id);
        }

        // GET: api/<EducationController>/major/{id}/subject
        [HttpGet]
        [Route("major/{id}/subject")]
        public IEnumerable<SelectResponse> GetSubjects(int id)
        {
            return _store.GetAllSubjects(id);
        }

        // GET api/<EducationController>/candidate/12345-1234567-1
        [HttpGet("candidate/{cnic}")]
        public EducationalDataResponse GetCandidateEducationalData(string cnic)
        {
            return _store.GetEducationalData(cnic);
        }

        // PUT api/<EducationController>/candidate/12345-1234567-1
        [HttpPut("candidate/{cnic}")]
        public bool Put(string cnic, [FromBody] EducationalDataRequest request)
        {
            return _store.UpdateEducationalData(cnic, request);
        }

        // GET api/<EducationController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EducationController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EducationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EducationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
