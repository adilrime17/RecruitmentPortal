using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_army_info")]
    public partial class CandidateArmyInfo
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Column("army_number")]
        [StringLength(250)]
        public string ArmyNumber { get; set; }
        [Column("w_o_s")]
        public bool WOS { get; set; }
        [Column("w_o_a")]
        public bool WOA { get; set; }
        [Column("unit")]
        [StringLength(250)]
        public string Unit { get; set; }
        [Column("corps")]
        [StringLength(250)]
        public string Corps { get; set; }
        [Column("d_o_d", TypeName = "timestamp")]
        public DateTime? DOD { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateArmyInfo))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
    }
}
