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

        // GET: api/<TestsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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

        // POST api/<TestsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TestsController>/12345-1234567-1
        [HttpPut("{cnic}")]
        public bool UpdateTestsToAppear(string cnic, [FromBody] TestsRequest request)
        {
            return _store.UpdateTestsToAppear(cnic, request);
        }

        // PUT api/<TestsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TestsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
