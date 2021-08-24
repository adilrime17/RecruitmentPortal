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

        /// <summary>
        /// Get All Classes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SelectResponse> Get()
        {
            return _store.GetAll();
        }
    }
}
