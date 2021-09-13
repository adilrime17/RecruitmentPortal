using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_medical_info")]
    [Index(nameof(CandidateCnic), Name = "fk_candidate_medical_info_candidate2_idx")]
    [Index(nameof(CourseId), Name = "fk_candidate_medical_info_course2_idx")]
    public partial class CandidateMedicalInfo
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Column("course_id")]
        public int CourseId { get; set; }
        [Column("height")]
        public float Height { get; set; }
        [Column("chest_in")]
        public float ChestIn { get; set; }
        [Column("chest_out")]
        public float ChestOut { get; set; }
        [Column("weight")]
        public float Weight { get; set; }
        [Column("visible_deformity")]
        public bool VisibleDeformity { get; set; }
        [Column("temperature")]
        public float? Temperature { get; set; }
        [Column("pulse_rate")]
        public float? PulseRate { get; set; }
        [Column("b_p_low")]
        public int? BPLow { get; set; }
        [Column("b_p_high")]
        public int? BPHigh { get; set; }
        [Column("deformity_list", TypeName = "text")]
        public string DeformityList { get; set; }
        [Column("status_update")]
        [StringLength(250)]
        public string StatusUpdate { get; set; }
        [Column("remarks")]
        [StringLength(500)]
        public string Remarks { get; set; }
        [Column("comments_by_rmo")]
        [StringLength(500)]
        public string CommentsByRmo { get; set; }
        [Column("final_status")]
        [StringLength(250)]
        public string FinalStatus { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateMedicalInfos))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CandidateMedicalInfos")]
        public virtual Course Course { get; set; }
    }
}
