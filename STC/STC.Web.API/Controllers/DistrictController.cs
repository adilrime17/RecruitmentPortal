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
    public class DistrictController : ControllerBase
    {
        private readonly DistrictStore _store;

        public DistrictController(DistrictStore store)
        {
            _store = store;
        }

        /// <summary>
        /// Get All Districts
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SelectResponse> Get()
        {
            return _store.GetAll();
        }
    }
}
