
import { DailyReport } from '../types';

export const formatReportToText = (report: DailyReport): string => {
  let text = `📋 *CHECKLIST DIÁRIO – BOMBEAMENTO ULTRAFINO*\n\n`;
  text += `📅 DATA: ${report.date}| TURNO: ${report.shift}| TURMA: ${report.team} | OPERADOR: ${report.operator}\n\n`;

  report.groups.forEach(group => {
    text += `*${group.name}*\n`;
    group.items.forEach(item => {
      text += `${item.tag} ${item.status}${item.comment ? ` ${item.comment}` : ''}\n`;
    });
    text += `\n`;
  });

  text += `📝 *OBSERVAÇÕES*\n${report.observations || 'Nenhuma'}\n\n`;
  text += `📌 *LEGENDA SCADA*\n🟢 RODANDO | 🔴 PARADO | 🟡 STANDBY | ⚠️ ANOMALIA`;

  return text;
};
