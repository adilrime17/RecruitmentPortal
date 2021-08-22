using STC.Common.Responses;
using STC.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace STC.Core.Stores
{
    public class LocationClassStore
    {
        private readonly STCDbContext _dbContext;

        public LocationClassStore(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IList<SelectResponse> GetAll()
        {
            return _dbContext.LocationClasses.Select(x => new SelectResponse()
            {
                Id = x.Id.ToString(),
                Label = x.Name
            })
                .ToList();
        }
    }
}
