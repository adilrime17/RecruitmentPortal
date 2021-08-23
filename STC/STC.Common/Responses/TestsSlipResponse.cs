using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Responses
{
    public class TestsSlipResponse
    {
        public string RegistrationNo { get; set; }
        public IList<SlipDetails> SlipDetails { get; set; } = new List<SlipDetails>();
    }

    public class SlipDetails
    {
        public string Test { get; set; }
        public DateTime Day { get; set; }
    }
}
