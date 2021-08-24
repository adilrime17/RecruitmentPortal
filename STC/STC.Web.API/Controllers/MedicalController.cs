using Microsoft.AspNetCore.Mvc;
using STC.Common.Requests;
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
    public class MedicalController : ControllerBase
    {
        private readonly MedicalStore _store;

        public MedicalController(MedicalStore store)
        {
            _store = store;
        }

        // GET: api/<MedicalController>/status
        [HttpGet]
        [Route("status")]
        public IEnumerable<string> GetStatus()
        {
            return new string[] {
                        "FIT by RMO",
                        "UNFIT By RMO (Reason fetched from template)",
                        "TUF (Reason)",
                        "Referred to Specialist (Incl type of specialist from referrals)",
                        "UNFIT by ______ Specialist in __________.",
            };
        }

        // PUT api/<MedicalController>/5
        [HttpPut("{cnic}")]
        public bool UpdateCandidateMedicalData(string cnic, [FromBody] UpdateCandidateMedicalDataRequest request)
        {
            return _store.UpdateCandidateMedicalData(cnic, request);
        }
    }
}
