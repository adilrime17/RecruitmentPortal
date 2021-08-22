using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("physical_test_score")]
    [Index(nameof(CourseId), Name = "fk_candidate_medical_info_course1_idx")]
    public partial class PhysicalTestScore
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Required]
        [Column("one_mile")]
        [StringLength(50)]
        public string OneMile { get; set; }
        [Required]
        [Column("pull_up")]
        [StringLength(50)]
        public string PullUp { get; set; }
        [Required]
        [Column("push_up")]
        [StringLength(50)]
        public string PushUp { get; set; }
        [Required]
        [Column("crunches")]
        [StringLength(50)]
        public string Crunches { get; set; }
        [Column("ditch")]
        public bool Ditch { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.PhysicalTestScores))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("PhysicalTestScores")]
        public virtual Course Course { get; set; }
    }
}
