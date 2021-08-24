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

        /// <summary>
        /// Get All Max Qualifications
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("max_qualification")]
        public IEnumerable<SelectResponse> GetMaxQualifications()
        {
            return _store.GetAllMaxQualifications();
        }

        /// <summary>
        /// Get All Education Levels
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("level")]
        public IEnumerable<SelectResponse> GetLevels()
        {
            return _store.GetAllLevels();
        }

        /// <summary>
        /// Get All Education Degrees
        /// </summary>
        /// <param name="id">level ID</param>
        /// <returns></returns>
        [HttpGet]
        [Route("level/{id}/degree")]
        public IEnumerable<SelectResponse> GetDegrees(int id)
        {
            return _store.GetAllDegrees(id);
        }

        /// <summary>
        /// Get All Education Majors
        /// </summary>
        /// <param name="id">level ID</param>
        /// <returns></returns>
        [HttpGet]
        [Route("level/{id}/major")]
        public IEnumerable<SelectResponse> GetMajors(int id)
        {
            return _store.GetAllMajors(id);
        }

        /// <summary>
        /// Get All Education Subjects
        /// </summary>
        /// <param name="id">Major ID</param>
        /// <returns></returns>
        [HttpGet]
        [Route("major/{id}/subject")]
        public IEnumerable<SelectResponse> GetSubjects(int id)
        {
            return _store.GetAllSubjects(id);
        }

        /// <summary>
        /// Get educational data of candidate
        /// </summary>
        /// <param name="cnic"></param>
        /// <returns></returns>
        [HttpGet("candidate/{cnic}")]
        public EducationalDataResponse GetCandidateEducationalData(string cnic)
        {
            return _store.GetEducationalData(cnic);
        }

        /// <summary>
        /// update educational data of candidate
        /// </summary>
        /// <param name="cnic"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("candidate/{cnic}")]
        public bool Put(string cnic, [FromBody] EducationalDataRequest request)
        {
            return _store.UpdateEducationalData(cnic, request);
        }
    }
}
