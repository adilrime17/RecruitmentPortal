using STC.Common.Responses;
using STC.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace STC.Core.Stores
{
    public class DistrictStore
    {
        private readonly STCDbContext _dbContext;

        public DistrictStore(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<SelectResponse> GetAll()
        {
            return _dbContext.Districts.Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            })
                .ToList();
        }
    }
}
