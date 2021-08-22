using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("district")]
    public partial class District
    {
        public District()
        {
            CandidateCourseSummaries = new HashSet<CandidateCourseSummary>();
            Candidates = new HashSet<Candidate>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("abbreviation")]
        [StringLength(250)]
        public string Abbreviation { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Required]
        [Column("province")]
        [StringLength(250)]
        public string Province { get; set; }
        [Column("leniency")]
        public bool Leniency { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [InverseProperty(nameof(CandidateCourseSummary.District))]
        public virtual ICollection<CandidateCourseSummary> CandidateCourseSummaries { get; set; }
        [InverseProperty(nameof(Candidate.District))]
        public virtual ICollection<Candidate> Candidates { get; set; }
    }
}
