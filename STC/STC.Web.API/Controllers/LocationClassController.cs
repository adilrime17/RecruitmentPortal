using Microsoft.AspNetCore.Mvc;
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
    public class LocationClassController : ControllerBase
    {
        private readonly LocationClassStore _store;

        public LocationClassController(LocationClassStore store)
        {
            _store = store;
        }

        // GET: api/<LocationClassController>
        [HttpGet]
        public IEnumerable<SelectResponse> Get()
        {
            return _store.GetAll();
        }

        // GET api/<LocationClassController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LocationClassController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LocationClassController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LocationClassController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
